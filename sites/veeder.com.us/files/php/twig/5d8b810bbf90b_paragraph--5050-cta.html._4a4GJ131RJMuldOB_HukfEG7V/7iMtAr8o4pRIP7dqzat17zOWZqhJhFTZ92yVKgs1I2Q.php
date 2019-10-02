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

/* themes/custom/veeder/templates/paragraph/paragraph--5050-cta.html.twig */
class __TwigTemplate_989ce0774ac62e27d015761618bf9e4305186d08af46e0dc258f4fd7ca4a9d75 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
            'paragraph' => [$this, 'block_paragraph'],
            'content' => [$this, 'block_content'],
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["set" => 40, "if" => 50, "block" => 56];
        $filters = ["clean_class" => 45, "render" => 50, "merge" => 51, "escape" => 57, "replace" => 57, "trim" => 57, "raw" => 70];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if', 'block'],
                ['clean_class', 'render', 'merge', 'escape', 'replace', 'trim', 'raw'],
                []
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
        // line 40
        $context["classes"] = [0 => "paragraph", 1 => "space-small", 2 => "pb-3", 3 => ("paragraph-" . $this->sandbox->ensureToStringAllowed($this->getAttribute(        // line 44
($context["paragraph"] ?? null), "id", [], "method"))), 4 => ("paragraph--" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed($this->getAttribute(        // line 45
($context["paragraph"] ?? null), "bundle", [])))), 5 => ((        // line 46
($context["view_mode"] ?? null)) ? (((\Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed($this->getAttribute(($context["paragraph"] ?? null), "bundle", []))) . "--") . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(($context["view_mode"] ?? null))))) : (""))];
        // line 50
        if (( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_5050_image", []), 0, []))) && twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_5050_vimeo_url", []), 0, []))))) {
            // line 51
            echo "  ";
            $context["classes"] = twig_array_merge($this->sandbox->ensureToStringAllowed(($context["classes"] ?? null)), [0 => "text-img-sec"]);
        } else {
            // line 53
            echo "  ";
            $context["classes"] = twig_array_merge($this->sandbox->ensureToStringAllowed(($context["classes"] ?? null)), [0 => "text-video-sec"]);
        }
        // line 55
        echo "
";
        // line 56
        $this->displayBlock('paragraph', $context, $blocks);
    }

    public function block_paragraph($context, array $blocks = [])
    {
        // line 57
        echo "  <section";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["attributes"] ?? null), "addClass", [0 => ($context["classes"] ?? null)], "method")), "html", null, true);
        echo " id=\"";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, twig_replace_filter(twig_trim_filter($this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["paragraph"] ?? null), "field_5050_cta_id", []), 0, []), "value", []))), " ", "-"), "html", null, true);
        echo "\">
  ";
        // line 58
        $this->displayBlock('content', $context, $blocks);
        // line 142
        echo "  </section>
";
    }

    // line 58
    public function block_content($context, array $blocks = [])
    {
        // line 59
        echo "    <div class=\"container\">
      <div class=\"row align-items-center\">
        ";
        // line 62
        echo "        ";
        if (($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_5050_cta_text_first", []), 0, []), "#markup", [], "array") == 1)) {
            // line 63
            echo "          <div class=\"col-md-6 text-part\">
            <div class=\"inner-wrap\">
              <div class=\"line-title\"><span class=\"hr-line\"></span>";
            // line 65
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_5050_cta_callout", []), 0, [])), "html", null, true);
            echo "</div>
              ";
            // line 66
            if ( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_5050_cta_heading", [])))) {
                // line 67
                echo "                <h3>";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_5050_cta_heading", []), 0, [])), "html", null, true);
                echo "</h3>
              ";
            }
            // line 69
            echo "              ";
            if ( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_5050_cta_description", [])))) {
                // line 70
                echo "                ";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_5050_cta_description", []), 0, [])));
                echo "
              ";
            }
            // line 72
            echo "              ";
            if ( !twig_test_empty($this->getAttribute($this->getAttribute($this->getAttribute(($context["paragraph"] ?? null), "field_5050_cta", []), 0, []), "title", []))) {
                // line 73
                echo "                <a href=\"";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["paragraph"] ?? null), "field_5050_cta", []), 0, []), "url", [])), "html", null, true);
                echo "\" class=\"btn btn-black\" ";
                if ( !(null === $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(($context["paragraph"] ?? null), "field_5050_cta", []), 0, []), "options", []), "attributes", []), "target", []))) {
                    echo "target=\"";
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(($context["paragraph"] ?? null), "field_5050_cta", []), 0, []), "options", []), "attributes", []), "target", [])), "html", null, true);
                    echo "\"";
                }
                echo ">";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["paragraph"] ?? null), "field_5050_cta", []), 0, []), "title", [])), "html", null, true);
                echo "</a>
              ";
            }
            // line 75
            echo "            </div>
          </div>
          <div class=\"col-md-6 ";
            // line 77
            if (( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_5050_image", []))) && twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_5050_vimeo_url", []))))) {
                echo "img-part";
            } else {
                echo "video-part";
            }
            echo "\">
            <div class=\"inner-wrap\">
              ";
            // line 79
            if ((($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_5050_cta_vimeo_player", []), 0, []), "#markup", [], "array") == 0) &&  !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_5050_vimeo_url", []))))) {
                // line 80
                echo "                <a href=\"";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["paragraph"] ?? null), "field_5050_vimeo_url", []), 0, []), "value", [])), "html", null, true);
                echo "\" data-fancybox class=\"c-video\" style=\"background: url(";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["para_vimeo_thumb"] ?? null)), "html", null, true);
                echo ") no-repeat center / cover\">
                  <span class=\"play-icon ic-play-icon\"></span>
                </a>
              ";
            } elseif ((( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(            // line 83
($context["content"] ?? null), "field_5050_vimeo_url", []))) && ($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_5050_cta_vimeo_player", []), 0, []), "#markup", [], "array") == 1)) && twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_5050_image", []))))) {
                // line 84
                echo "                <a href=\"javascript:;\" class=\"c-video\">
                  <iframe src=\"";
                // line 85
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["paragraph"] ?? null), "field_5050_vimeo_url", []), 0, []), "value", [])), "html", null, true);
                echo "\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen=\"\"></iframe>
                  <span class=\"play-icon ic-play-icon\"></span>
                </a>
              ";
            } elseif (( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(            // line 88
($context["content"] ?? null), "field_5050_image", []))) && ($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_5050_image_parallax", []), 0, []), "#markup", [], "array") == 0))) {
                // line 89
                echo "                <figure>
                  ";
                // line 90
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["content"] ?? null), "field_5050_image", [])), "html", null, true);
                echo "
                </figure>
              ";
            } elseif (( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(            // line 92
($context["content"] ?? null), "field_5050_image", []))) && ($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_5050_image_parallax", []), 0, []), "#markup", [], "array") == 1))) {
                // line 93
                echo "                <div class=\"bg-img\">
                  <div class=\"parallax-img\">
                    ";
                // line 95
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_5050_image", []), 0, [])), "html", null, true);
                echo "
                  </div>
                </div>
              ";
            }
            // line 99
            echo "            </div>
          </div>
        ";
        } else {
            // line 102
            echo "          <div class=\"col-md-6 ";
            if (( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_5050_image", []))) && twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_5050_vimeo_url", []))))) {
                echo "img-part";
            } else {
                echo "video-part";
            }
            echo "\">
            <div class=\"inner-wrap\">
              ";
            // line 104
            if ((($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_5050_cta_vimeo_player", []), 0, []), "#markup", [], "array") == 0) &&  !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_5050_vimeo_url", []))))) {
                // line 105
                echo "                <a href=\"";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["paragraph"] ?? null), "field_5050_vimeo_url", []), 0, []), "value", [])), "html", null, true);
                echo "\" data-fancybox class=\"c-video\" style=\"background: url(";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["para_vimeo_thumb"] ?? null)), "html", null, true);
                echo ") no-repeat center / cover\">
                  <span class=\"play-icon ic-play-icon\"></span>
                </a>
              ";
            } elseif ((( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(            // line 108
($context["content"] ?? null), "field_5050_vimeo_url", []))) && ($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_5050_cta_vimeo_player", []), 0, []), "#markup", [], "array") == 1)) && twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_5050_image", []))))) {
                // line 109
                echo "                <a href=\"javascript:;\" class=\"c-video\">
                  <iframe src=\"";
                // line 110
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["paragraph"] ?? null), "field_5050_vimeo_url", []), 0, []), "value", [])), "html", null, true);
                echo "\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen=\"\"></iframe>
                  <span class=\"play-icon ic-play-icon\"></span>
                </a>
              ";
            } elseif (( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(            // line 113
($context["content"] ?? null), "field_5050_image", []))) && ($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_5050_image_parallax", []), 0, []), "#markup", [], "array") == 0))) {
                // line 114
                echo "                <figure>
                  ";
                // line 115
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["content"] ?? null), "field_5050_image", [])), "html", null, true);
                echo "
                </figure>
              ";
            } elseif (( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(            // line 117
($context["content"] ?? null), "field_5050_image", []))) && ($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_5050_image_parallax", []), 0, []), "#markup", [], "array") == 1))) {
                // line 118
                echo "                <div class=\"bg-img\">
                  <div class=\"parallax-img\">
                    ";
                // line 120
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_5050_image", []), 0, [])), "html", null, true);
                echo "
                  </div>
                </div>
              ";
            }
            // line 124
            echo "            </div>
          </div>
          <div class=\"col-md-6 text-part\">
            <div class=\"line-title\"><span class=\"hr-line\"></span>";
            // line 127
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_5050_cta_callout", []), 0, [])), "html", null, true);
            echo "</div>
            ";
            // line 128
            if ( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_5050_cta_heading", [])))) {
                // line 129
                echo "              <h3>";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_5050_cta_heading", []), 0, [])), "html", null, true);
                echo "</h3>
            ";
            }
            // line 131
            echo "            ";
            if ( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_5050_cta_description", [])))) {
                // line 132
                echo "              ";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_5050_cta_description", []), 0, [])));
                echo "
            ";
            }
            // line 134
            echo "            ";
            if ( !twig_test_empty($this->getAttribute($this->getAttribute($this->getAttribute(($context["paragraph"] ?? null), "field_5050_cta", []), 0, []), "title", []))) {
                // line 135
                echo "              <a href=\"";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["paragraph"] ?? null), "field_5050_cta", []), 0, []), "url", [])), "html", null, true);
                echo "\" class=\"btn btn-black\" ";
                if ( !(null === $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(($context["paragraph"] ?? null), "field_5050_cta", []), 0, []), "options", []), "attributes", []), "target", []))) {
                    echo "target=\"";
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(($context["paragraph"] ?? null), "field_5050_cta", []), 0, []), "options", []), "attributes", []), "target", [])), "html", null, true);
                    echo "\"";
                }
                echo ">";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["paragraph"] ?? null), "field_5050_cta", []), 0, []), "title", [])), "html", null, true);
                echo "</a>
            ";
            }
            // line 137
            echo "          </div>
        ";
        }
        // line 139
        echo "      </div>
    </div>
  ";
    }

    public function getTemplateName()
    {
        return "themes/custom/veeder/templates/paragraph/paragraph--5050-cta.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  312 => 139,  308 => 137,  294 => 135,  291 => 134,  285 => 132,  282 => 131,  276 => 129,  274 => 128,  270 => 127,  265 => 124,  258 => 120,  254 => 118,  252 => 117,  247 => 115,  244 => 114,  242 => 113,  236 => 110,  233 => 109,  231 => 108,  222 => 105,  220 => 104,  210 => 102,  205 => 99,  198 => 95,  194 => 93,  192 => 92,  187 => 90,  184 => 89,  182 => 88,  176 => 85,  173 => 84,  171 => 83,  162 => 80,  160 => 79,  151 => 77,  147 => 75,  133 => 73,  130 => 72,  124 => 70,  121 => 69,  115 => 67,  113 => 66,  109 => 65,  105 => 63,  102 => 62,  98 => 59,  95 => 58,  90 => 142,  88 => 58,  81 => 57,  75 => 56,  72 => 55,  68 => 53,  64 => 51,  62 => 50,  60 => 46,  59 => 45,  58 => 44,  57 => 40,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/custom/veeder/templates/paragraph/paragraph--5050-cta.html.twig", "E:\\inetpub\\wwwroot\\d8local.veeder.com\\themes\\custom\\veeder\\templates\\paragraph\\paragraph--5050-cta.html.twig");
    }
}
