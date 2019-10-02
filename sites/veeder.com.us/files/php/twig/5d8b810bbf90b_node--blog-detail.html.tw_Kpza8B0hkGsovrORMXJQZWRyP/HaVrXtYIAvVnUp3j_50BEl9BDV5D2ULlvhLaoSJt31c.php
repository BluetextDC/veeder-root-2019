<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* themes/custom/veeder/templates/node/node--blog-detail.html.twig */
class __TwigTemplate_4902992c43109a1b19cdc5117ce1e6e859f5c3655e3a1e359fff06ab96d8b8c5 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["if" => 75, "include" => 175];
        $filters = ["render" => 77, "escape" => 80, "trans" => 94, "raw" => 155, "without" => 172];
        $functions = ["file_url" => 142];

        try {
            $this->sandbox->checkSecurity(
                ['if', 'include'],
                ['render', 'escape', 'trans', 'raw', 'without'],
                ['file_url']
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->getSourceContext());

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 75
        if ((($context["view_mode"] ?? null) == "featured_view")) {
            // line 76
            echo "  <div class=\"featured-blog d-flex flex-wrap align-items-center col-md-7 col-lg-8\">
    ";
            // line 77
            if ( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_detail_image", []), 0, [])))) {
                // line 78
                echo "      <div class=\"img-part\">
        <figure>
          ";
                // line 80
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_detail_image", []), 0, [])), "html", null, true);
                echo "
        </figure>
      </div>
    ";
            }
            // line 84
            echo "    <div class=\"text-part\">
        <div class=\"line-title\"><span class=\"hr-line\"></span></div>
        ";
            // line 86
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title_prefix"] ?? null)), "html", null, true);
            echo "
          ";
            // line 87
            if ( !($context["page"] ?? null)) {
                // line 88
                echo "            <h4";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title_attributes"] ?? null)), "html", null, true);
                echo ">
              <a href=\"";
                // line 89
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["url"] ?? null)), "html", null, true);
                echo "\" rel=\"bookmark\">";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["label"] ?? null)), "html", null, true);
                echo "</a>
            </h4>
          ";
            }
            // line 92
            echo "        ";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title_suffix"] ?? null)), "html", null, true);
            echo "
        <p>";
            // line 93
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_summary", []), 0, [])), "html", null, true);
            echo "</p>
        <a href=\"";
            // line 94
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["url"] ?? null)), "html", null, true);
            echo "\" class=\"btn-link\" data-icon=\"c\">";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar(t("Read More"));
            echo "</a>
    </div>
  </div>
";
        } elseif ((        // line 97
($context["view_mode"] ?? null) == "teaser")) {
            // line 98
            echo "  <div class=\"item col-md-4\">
      <div class=\"inner-item\">
          <figure>
            ";
            // line 101
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_detail_image", []), 0, [])), "html", null, true);
            echo "
          </figure>
          <div class=\"desc line-top\">
              ";
            // line 104
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title_prefix"] ?? null)), "html", null, true);
            echo "
                ";
            // line 105
            if ( !($context["page"] ?? null)) {
                // line 106
                echo "                  <h6";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title_attributes"] ?? null)), "html", null, true);
                echo ">";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["label"] ?? null)), "html", null, true);
                echo "</h6>
                ";
            }
            // line 108
            echo "              ";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title_suffix"] ?? null)), "html", null, true);
            echo "
              <span class=\"cat\">";
            // line 109
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_tags", []), 0, [])), "html", null, true);
            echo "</span>
              <div class=\"date-show\">";
            // line 110
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_date", []), 0, [])), "html", null, true);
            echo " | ";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_author", []), 0, [])), "html", null, true);
            echo "</div>
              <p>";
            // line 111
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_summary", []), 0, [])), "html", null, true);
            echo "</p>
              <a href=\"";
            // line 112
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["url"] ?? null)), "html", null, true);
            echo "\" class=\"btn-link\" data-icon=\"c\">";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar(t("Read More"));
            echo "</a>
          </div>
      </div>
  </div>
";
        } else {
            // line 117
            echo "  <div";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["attributes"] ?? null)), "html", null, true);
            echo ">

    ";
            // line 119
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title_prefix"] ?? null)), "html", null, true);
            echo "
    ";
            // line 120
            if ( !($context["page"] ?? null)) {
                // line 121
                echo "      <h2";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title_attributes"] ?? null)), "html", null, true);
                echo ">
        <a href=\"";
                // line 122
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["url"] ?? null)), "html", null, true);
                echo "\" rel=\"bookmark\">";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["label"] ?? null)), "html", null, true);
                echo "</a>
      </h2>
    ";
            }
            // line 125
            echo "    ";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title_suffix"] ?? null)), "html", null, true);
            echo "

    <section class=\"hero-section";
            // line 127
            if ((twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_detail_image", []), 0, []))) && twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_blog_detail_vimeo", []))))) {
                echo " NoHero-sec";
            }
            echo "\">
      <div class=\"small-inner-banner";
            // line 128
            if ( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_blog_detail_vimeo", [])))) {
                echo " video-banner";
            }
            echo "\">
        <div class=\"banner-caption\" style=\"background-color: ";
            // line 129
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_detail_plate_color", []), 0, [])), "html", null, true);
            echo ";\">
          <div class=\"cap-wrap\">
            <h1 style=\"color: #fff;\">";
            // line 131
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_detail_heading", []), 0, [])), "html", null, true);
            echo "</h1>
            <div class=\"tag\" style=\"color: #fff;\"><span>";
            // line 132
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_author", []), 0, [])), "html", null, true);
            echo "</span><span>";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_date", []), 0, [])), "html", null, true);
            echo "</span><span>";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_tags", []), 0, [])), "html", null, true);
            echo ",  ";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_tags", []), 1, [])), "html", null, true);
            echo "</span></div>
            ";
            // line 133
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["content"] ?? null), "field_blog_social_share", [])), "html", null, true);
            echo "                                
          </div>
        </div>
        ";
            // line 136
            if ( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_blog_detail_vimeo", [])))) {
                // line 137
                echo "          <a href=\"";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_detail_vimeo", []), 0, [])), "html", null, true);
                echo "\" data-fancybox class=\"c-video bg-img\"";
                if (($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_detail_image_parallax", []), 0, []), "#markup", [], "array") == 1)) {
                    echo " id=\"parallax\"";
                }
                echo " style=\"background: url(";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["vimeo_thumb"] ?? null)), "html", null, true);
                echo ") no-repeat center / cover;\">
            <span class=\"play-icon ic-play-icon\"></span>
          </a>
        ";
            } elseif ( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(            // line 140
($context["content"] ?? null), "field_blog_detail_image", [])))) {
                // line 141
                echo "          <div class=\"banner-img\">
            <div class=\"bg-img\"";
                // line 142
                if (($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_detail_image_parallax", []), 0, []), "#markup", [], "array") == 1)) {
                    echo " id=\"parallax\"";
                }
                echo " style=\"background: url(";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, call_user_func_array($this->env->getFunction('file_url')->getCallable(), [$this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_detail_image", []), "#items", [], "array"), "entity", []), "uri", []), "value", []))]), "html", null, true);
                echo ") no-repeat center / cover;\">
            </div>
          </div>
        ";
            }
            // line 145
            echo "                     
      </div>
    </section>
    
    ";
            // line 150
            echo "    <section class=\"side-sec-wrap space-small\">
      <div class=\"container\">                           
        <div class=\"inner-wrap d-flex flex-wrap\">
          <div class=\"left-side-part\">
            <div class=\"e-desc\">
              ";
            // line 155
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_body", []), 0, [])));
            echo "
            </div>
          </div>
          <div class=\"right-side-part\">
            <div class=\"related-insight\">
              <h4>";
            // line 160
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_related_heading", []), 0, [])), "html", null, true);
            echo "</h4>
              ";
            // line 161
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["content"] ?? null), "field_blog_realted_view", [])), "html", null, true);
            echo "
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class=\"main-content\">
      ";
            // line 169
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["content"] ?? null), "field_components", [])), "html", null, true);
            echo "

      ";
            // line 172
            echo "      ";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->env->getExtension('Drupal\Core\Template\TwigExtension')->withoutFilter($this->sandbox->ensureToStringAllowed(($context["content"] ?? null)), "field_blog_author", "field_breadcrumb_color", "field_components", "field_enable_jump_nav", "field_display_breadcrumbs", "field_display_contact_sidebar", "field_blog_date", "field_display_contact_footer", "field_contact_footer_form", "field_blog_detail_heading", "field_blog_detail_image", "field_blog_detail_plate_color", "field_blog_detail_vimeo", "field_blog_detail_image_parallax", "field_blog_related_heading", "field_blog_realted_view", "field_summary", "field_blog_tags", "field_body", "field_blog_social_share", "field_blog_refer_weight", "field_color_variation"), "html", null, true);
            echo "

      ";
            // line 175
            echo "      ";
            $this->loadTemplate((($context["directory"] ?? null) . "/templates/parts/contact-footer.html.twig"), "themes/custom/veeder/templates/node/node--blog-detail.html.twig", 175)->display($context);
            // line 176
            echo "    </div>
  </div>
";
        }
    }

    public function getTemplateName()
    {
        return "themes/custom/veeder/templates/node/node--blog-detail.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  318 => 176,  315 => 175,  309 => 172,  304 => 169,  293 => 161,  289 => 160,  281 => 155,  274 => 150,  268 => 145,  257 => 142,  254 => 141,  252 => 140,  239 => 137,  237 => 136,  231 => 133,  221 => 132,  217 => 131,  212 => 129,  206 => 128,  200 => 127,  194 => 125,  186 => 122,  181 => 121,  179 => 120,  175 => 119,  169 => 117,  159 => 112,  155 => 111,  149 => 110,  145 => 109,  140 => 108,  132 => 106,  130 => 105,  126 => 104,  120 => 101,  115 => 98,  113 => 97,  105 => 94,  101 => 93,  96 => 92,  88 => 89,  83 => 88,  81 => 87,  77 => 86,  73 => 84,  66 => 80,  62 => 78,  60 => 77,  57 => 76,  55 => 75,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/custom/veeder/templates/node/node--blog-detail.html.twig", "E:\\inetpub\\wwwroot\\d8local.veeder.com\\themes\\custom\\veeder\\templates\\node\\node--blog-detail.html.twig");
    }
}
