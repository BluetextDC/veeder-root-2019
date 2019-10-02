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

/* themes/custom/veeder/templates/node/node--article.html.twig */
class __TwigTemplate_61436fcdb53c38873eec0e5ceae17fd2a7f5f8b1249b1bac02e502a82eed41a1 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["if" => 78, "include" => 146];
        $filters = ["escape" => 75, "render" => 85, "without" => 143];
        $functions = ["file_url" => 106];

        try {
            $this->sandbox->checkSecurity(
                ['if', 'include'],
                ['escape', 'render', 'without'],
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
        echo "<div";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["attributes"] ?? null)), "html", null, true);
        echo ">

  ";
        // line 77
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title_prefix"] ?? null)), "html", null, true);
        echo "
  ";
        // line 78
        if ( !($context["page"] ?? null)) {
            // line 79
            echo "    <h2";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title_attributes"] ?? null)), "html", null, true);
            echo ">
      <a href=\"";
            // line 80
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["url"] ?? null)), "html", null, true);
            echo "\" rel=\"bookmark\">";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["label"] ?? null)), "html", null, true);
            echo "</a>
    </h2>
  ";
        }
        // line 83
        echo "  ";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title_suffix"] ?? null)), "html", null, true);
        echo "

  <section class=\"hero-section";
        // line 85
        if ((twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_blog_listing_image", []))) && twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_blog_listing_vimeo", []))))) {
            echo " NoHero-sec";
        }
        echo "\">
    <div class=\"inner-banner";
        // line 86
        if ( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_blog_listing_vimeo", [])))) {
            echo " video-banner";
        }
        echo "\">
      <div class=\"banner-caption";
        // line 87
        if (twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_blog_listing_image", [])))) {
            echo " simple-banner";
        }
        echo "\" style=\"background-color: ";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_listing_plate_color", []), 0, [])), "html", null, true);
        echo ";\">
        <div class=\"caption-wrap\">
          <div class=\"heading";
        // line 89
        if (twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_blog_listing_description", [])))) {
            echo " no-separator";
        }
        echo "\">
            <h1 style=\"color: #ffffff\">";
        // line 90
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_listing_heading", []), 0, [])), "html", null, true);
        echo "</h1>
          </div>
          ";
        // line 92
        if ( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_blog_listing_description", [])))) {
            // line 93
            echo "            <p style=\"color: #ffffff\">";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_listing_description", []), 0, [])), "html", null, true);
            echo "</p>
          ";
        }
        // line 95
        echo "          ";
        if ( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute($this->getAttribute($this->getAttribute(($context["node"] ?? null), "field_blog_listing_cta_cta", []), 0, []), "title", [])))) {
            // line 96
            echo "            <a href=\"";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["node"] ?? null), "field_blog_listing_cta_cta", []), 0, []), "url", [])), "html", null, true);
            echo "\" class=\"btn\" style=\"color: #000;\" ";
            if ( !(null === $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(($context["node"] ?? null), "field_blog_listing_cta_cta", []), 0, []), "options", []), "attributes", []), "target", []))) {
                echo "target=\"";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(($context["node"] ?? null), "field_blog_listing_cta_cta", []), 0, []), "options", []), "attributes", []), "target", [])), "html", null, true);
                echo "\"";
            }
            echo ">";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["node"] ?? null), "field_blog_listing_cta_cta", []), 0, []), "title", [])), "html", null, true);
            echo "</a>
          ";
        }
        // line 98
        echo "        </div>
      </div>
      ";
        // line 100
        if ( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_blog_listing_vimeo", [])))) {
            // line 101
            echo "        <a href=\"";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_listing_vimeo", []), 0, [])), "html", null, true);
            echo "\" data-fancybox class=\"c-video bg-img\"";
            if (($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_listing_image_paralla", []), 0, []), "#markup", [], "array") == 1)) {
                echo " id=\"parallax\"";
            }
            echo " style=\"background: url(";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["vimeo_thumb"] ?? null)), "html", null, true);
            echo ") no-repeat center / cover;\">
          <span class=\"play-icon ic-play-icon\"></span>
        </a>
      ";
        } elseif ( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(        // line 104
($context["content"] ?? null), "field_blog_listing_image", [])))) {
            // line 105
            echo "        <div class=\"banner-img\">
          <div class=\"bg-img\"";
            // line 106
            if (($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_listing_image_paralla", []), 0, []), "#markup", [], "array") == 1)) {
                echo " id=\"parallax\"";
            }
            echo " style=\"background: url(";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, call_user_func_array($this->env->getFunction('file_url')->getCallable(), [$this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_listing_image", []), "#items", [], "array"), "entity", []), "uri", []), "value", []))]), "html", null, true);
            echo ") no-repeat center / cover;\">
          </div>
        </div>
      ";
        }
        // line 109
        echo "                     
    </div>
  </section>

  ";
        // line 114
        echo "  <div class=\"main-content\">
    <section class=\"blog-post-sec space-small\">
      <div class=\"container\">
        <div class=\"blog-post-wrap\">
          <div class=\"row\">
            ";
        // line 119
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_featured_blog_post", []), 0, [])), "html", null, true);
        echo "
            <div class=\"trending-posts col-md-5 col-lg-4\">
              <div class=\"inner-trend-wrap bg-light-gray\">
                <h5>";
        // line 122
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_listing_trending_head", []), 0, [])), "html", null, true);
        echo "</h5>
                ";
        // line 123
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["content"] ?? null), "field_blog_listing_trending_view", [])), "html", null, true);
        echo "
                <div class=\"tri-color large\"></div>
              </div>
            </div>
          </div>
        </div>
        <div class=\"blog-list-wrap\">
          <div class=\"category-by mb-1\">
            ";
        // line 131
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_listing_filter_tags", []), 0, [])), "html", null, true);
        echo "
          </div>
          <div class=\"blog-list\">
            ";
        // line 134
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_blog_listing_listing", []), 0, [])), "html", null, true);
        echo "
          </div>
        </div>                            
      </div>                      
    </section>
  
    ";
        // line 140
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["content"] ?? null), "field_components", [])), "html", null, true);
        echo "

    ";
        // line 143
        echo "    ";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->env->getExtension('Drupal\Core\Template\TwigExtension')->withoutFilter($this->sandbox->ensureToStringAllowed(($context["content"] ?? null)), "field_blog_listing_listing", "field_breadcrumb_color", "field_components", "field_enable_jump_nav", "field_blog_listing_cta_cta", "field_blog_listing_description", "field_display_breadcrumbs", "field_display_contact_sidebar", "field_display_contact_footer", "field_featured_blog_post", "field_contact_footer_form", "field_blog_listing_heading", "field_blog_listing_image", "field_blog_listing_plate_color", "field_blog_listing_vimeo", "field_blog_listing_image_paralla", "field_summary", "field_blog_listing_trending_head", "field_blog_listing_trending_view", "field_blog_listing_filter_tags", "field_color_variation"), "html", null, true);
        echo "

    ";
        // line 146
        echo "    ";
        $this->loadTemplate((($context["directory"] ?? null) . "/templates/parts/contact-footer.html.twig"), "themes/custom/veeder/templates/node/node--article.html.twig", 146)->display($context);
        // line 147
        echo "  </div>
</div>
";
    }

    public function getTemplateName()
    {
        return "themes/custom/veeder/templates/node/node--article.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  241 => 147,  238 => 146,  232 => 143,  227 => 140,  218 => 134,  212 => 131,  201 => 123,  197 => 122,  191 => 119,  184 => 114,  178 => 109,  167 => 106,  164 => 105,  162 => 104,  149 => 101,  147 => 100,  143 => 98,  129 => 96,  126 => 95,  120 => 93,  118 => 92,  113 => 90,  107 => 89,  98 => 87,  92 => 86,  86 => 85,  80 => 83,  72 => 80,  67 => 79,  65 => 78,  61 => 77,  55 => 75,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/custom/veeder/templates/node/node--article.html.twig", "E:\\inetpub\\wwwroot\\d8local.veeder.com\\themes\\custom\\veeder\\templates\\node\\node--article.html.twig");
    }
}
